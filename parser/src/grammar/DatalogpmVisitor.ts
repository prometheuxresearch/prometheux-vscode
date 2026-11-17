//@ts-nocheck
// Generated from ./grammar/Datalogpm.g4 by ANTLR 4.13.1

import {ParseTreeVisitor} from 'antlr4';


import { ProgramContext } from "./DatalogpmParser";
import { ClauseContext } from "./DatalogpmParser";
import { CommentContext } from "./DatalogpmParser";
import { FactContext } from "./DatalogpmParser";
import { AnnotationBodyContext } from "./DatalogpmParser";
import { AnnotationContext } from "./DatalogpmParser";
import { TemporalAnnotationContext } from "./DatalogpmParser";
import { RruleContext } from "./DatalogpmParser";
import { HeadContext } from "./DatalogpmParser";
import { FalseHeadContext } from "./DatalogpmParser";
import { EgdHeadContext } from "./DatalogpmParser";
import { BodyContext } from "./DatalogpmParser";
import { LiteralContext } from "./DatalogpmParser";
import { PosLiteralContext } from "./DatalogpmParser";
import { NegLiteralContext } from "./DatalogpmParser";
import { DomStarContext } from "./DatalogpmParser";
import { DiamondMinusLiteralContext } from "./DatalogpmParser";
import { DiamondPlusLiteralContext } from "./DatalogpmParser";
import { BoxMinusLiteralContext } from "./DatalogpmParser";
import { BoxPlusLiteralContext } from "./DatalogpmParser";
import { TriangleUpLiteralContext } from "./DatalogpmParser";
import { TriangleDownLiteralContext } from "./DatalogpmParser";
import { CloseIntervalLiteralContext } from "./DatalogpmParser";
import { SelectIntervalLiteralContext } from "./DatalogpmParser";
import { SinceLiteralContext } from "./DatalogpmParser";
import { UntilLiteralContext } from "./DatalogpmParser";
import { ConditionContext } from "./DatalogpmParser";
import { GtConditionContext } from "./DatalogpmParser";
import { LtConditionContext } from "./DatalogpmParser";
import { GeConditionContext } from "./DatalogpmParser";
import { LeConditionContext } from "./DatalogpmParser";
import { EqConditionContext } from "./DatalogpmParser";
import { NeqConditionContext } from "./DatalogpmParser";
import { InConditionContext } from "./DatalogpmParser";
import { NotInConditionContext } from "./DatalogpmParser";
import { LtExpressionContext } from "./DatalogpmParser";
import { GtExpressionContext } from "./DatalogpmParser";
import { ExternalExpressionContext } from "./DatalogpmParser";
import { IntersectionExpressionContext } from "./DatalogpmParser";
import { MinusExpressionContext } from "./DatalogpmParser";
import { SkolemExpressionContext } from "./DatalogpmParser";
import { ProdExpressionContext } from "./DatalogpmParser";
import { LeExpressionContext } from "./DatalogpmParser";
import { EqEqExpressionContext } from "./DatalogpmParser";
import { NotExpressionContext } from "./DatalogpmParser";
import { DivExpressionContext } from "./DatalogpmParser";
import { PrecExpressionContext } from "./DatalogpmParser";
import { UnionExpressionContext } from "./DatalogpmParser";
import { StringOperatorsExpressionContext } from "./DatalogpmParser";
import { OrExpressionContext } from "./DatalogpmParser";
import { UnaryMinusExpressionContext } from "./DatalogpmParser";
import { NeqExpressionContext } from "./DatalogpmParser";
import { AndExpressionContext } from "./DatalogpmParser";
import { AggrExpressionContext } from "./DatalogpmParser";
import { GeExpressionContext } from "./DatalogpmParser";
import { PlusExpressionContext } from "./DatalogpmParser";
import { TermExpressionContext } from "./DatalogpmParser";
import { MsumAggExpressionContext } from "./DatalogpmParser";
import { MprodAggExpressionContext } from "./DatalogpmParser";
import { McountAggExpressionContext } from "./DatalogpmParser";
import { MunionAggExpressionContext } from "./DatalogpmParser";
import { MmaxAggExpressionContext } from "./DatalogpmParser";
import { MminAggExpressionContext } from "./DatalogpmParser";
import { UnionAggExpressionContext } from "./DatalogpmParser";
import { ListAggExpressionContext } from "./DatalogpmParser";
import { SetAggExpressionContext } from "./DatalogpmParser";
import { MinAggExpressionContext } from "./DatalogpmParser";
import { MaxAggExpressionContext } from "./DatalogpmParser";
import { SumAggExpressionContext } from "./DatalogpmParser";
import { ProdAggExpressionContext } from "./DatalogpmParser";
import { AvgAggExpressionContext } from "./DatalogpmParser";
import { CountAggExpressionContext } from "./DatalogpmParser";
import { SubstringExpressionContext } from "./DatalogpmParser";
import { ContainsExpressionContext } from "./DatalogpmParser";
import { StartsWithExpressionContext } from "./DatalogpmParser";
import { EndsWithExpressionContext } from "./DatalogpmParser";
import { ConcatExpressionContext } from "./DatalogpmParser";
import { StringLengthExpressionContext } from "./DatalogpmParser";
import { IndexOfExpressionContext } from "./DatalogpmParser";
import { VarListContext } from "./DatalogpmParser";
import { AnnotationAtomContext } from "./DatalogpmParser";
import { AtomAnnotationContext } from "./DatalogpmParser";
import { AtomContext } from "./DatalogpmParser";
import { TemporalIntervalContext } from "./DatalogpmParser";
import { TemporalRelativeIntervalNumberContext } from "./DatalogpmParser";
import { TemporalRelativeIntervalPeriodContext } from "./DatalogpmParser";
import { TemporalRelativeIntervalContext } from "./DatalogpmParser";
import { TemporalSelectIntervalContext } from "./DatalogpmParser";
import { TemporalTermOpenStartContext } from "./DatalogpmParser";
import { TemporalTermCloseStartContext } from "./DatalogpmParser";
import { TemporalTermOpenEndContext } from "./DatalogpmParser";
import { TemporalTermCloseEndContext } from "./DatalogpmParser";
import { TemporalTermStartValueDateContext } from "./DatalogpmParser";
import { TemporalTermStartValueNumberContext } from "./DatalogpmParser";
import { TemporalTermStartValueInftyContext } from "./DatalogpmParser";
import { TemporalTermEndValueDateContext } from "./DatalogpmParser";
import { TemporalTermEndValueNumberContext } from "./DatalogpmParser";
import { TemporalTermEndValueInftyContext } from "./DatalogpmParser";
import { TemporalSelectTermOpenStartContext } from "./DatalogpmParser";
import { TemporalSelectTermCloseStartContext } from "./DatalogpmParser";
import { TemporalSelectTermOpenEndContext } from "./DatalogpmParser";
import { TemporalSelectTermCloseEndContext } from "./DatalogpmParser";
import { TemporalSelectTermStartValueDateContext } from "./DatalogpmParser";
import { TemporalSelectTermStartValueNumberContext } from "./DatalogpmParser";
import { TemporalSelectTermStartValueInftyContext } from "./DatalogpmParser";
import { TemporalSelectTermEndValueDateContext } from "./DatalogpmParser";
import { TemporalSelectTermEndValueNumberContext } from "./DatalogpmParser";
import { TemporalSelectTermEndValueInftyContext } from "./DatalogpmParser";
import { TemporalRelativeTermOpenStartContext } from "./DatalogpmParser";
import { TemporalRelativeTermCloseStartContext } from "./DatalogpmParser";
import { TemporalRelativeTermOpenEndContext } from "./DatalogpmParser";
import { TemporalRelativeTermCloseEndContext } from "./DatalogpmParser";
import { TemporalRelativeTermStartValueNumberContext } from "./DatalogpmParser";
import { TemporalRelativeTermStartValueDateContext } from "./DatalogpmParser";
import { TemporalRelativeTermEndValueNumberContext } from "./DatalogpmParser";
import { TemporalRelativeTermEndValueInftyContext } from "./DatalogpmParser";
import { TemporalRelativeTermEndValueDateContext } from "./DatalogpmParser";
import { TemporalRelativeTermEndValueInftyDateContext } from "./DatalogpmParser";
import { TemporalTermDateContext } from "./DatalogpmParser";
import { TemporalTermNumberContext } from "./DatalogpmParser";
import { TemporalTermInftyContext } from "./DatalogpmParser";
import { DiamondMinusOperatorContext } from "./DatalogpmParser";
import { BoxMinusOperatorContext } from "./DatalogpmParser";
import { DiamondPlusOperatorContext } from "./DatalogpmParser";
import { BoxPlusOperatorContext } from "./DatalogpmParser";
import { SinceOperatorContext } from "./DatalogpmParser";
import { UntilOperatorContext } from "./DatalogpmParser";
import { TriangleUpOperatorContext } from "./DatalogpmParser";
import { TriangleDownOperatorContext } from "./DatalogpmParser";
import { CloseIntervalOperatorContext } from "./DatalogpmParser";
import { SelectIntervalOperatorContext } from "./DatalogpmParser";
import { DiamondPlusSymbolContext } from "./DatalogpmParser";
import { DiamondMinusSymbolContext } from "./DatalogpmParser";
import { SinceSymbolContext } from "./DatalogpmParser";
import { UntilSymbolContext } from "./DatalogpmParser";
import { BoxMinusSymbolContext } from "./DatalogpmParser";
import { BoxPlusSymbolContext } from "./DatalogpmParser";
import { TriangleUpSymbolContext } from "./DatalogpmParser";
import { TriangleDownSymbolContext } from "./DatalogpmParser";
import { CloseIntervalSymbolContext } from "./DatalogpmParser";
import { SelectIntervalSymbolContext } from "./DatalogpmParser";
import { TimeGroupInfoContext } from "./DatalogpmParser";
import { TimeGroupInfoIntegerContext } from "./DatalogpmParser";
import { TimeGroupInfoDoubleContext } from "./DatalogpmParser";
import { TimeUnitContext } from "./DatalogpmParser";
import { TermContext } from "./DatalogpmParser";
import { StringConstTermContext } from "./DatalogpmParser";
import { IntegerConstTermContext } from "./DatalogpmParser";
import { DoubleConstTermContext } from "./DatalogpmParser";
import { BooleanConstTermContext } from "./DatalogpmParser";
import { DateConstTermContext } from "./DatalogpmParser";
import { ListContext } from "./DatalogpmParser";
import { EmptySetContext } from "./DatalogpmParser";
import { StringSetContext } from "./DatalogpmParser";
import { IntegerSetContext } from "./DatalogpmParser";
import { DoubleSetContext } from "./DatalogpmParser";
import { DateSetContext } from "./DatalogpmParser";
import { VarTermContext } from "./DatalogpmParser";
import { AnonTermContext } from "./DatalogpmParser";
import { ParamTermContext } from "./DatalogpmParser";
import { FalseTermContext } from "./DatalogpmParser";
import { Iso8601DurationDefaultContext } from "./DatalogpmParser";
import { Iso8601DurationWeekContext } from "./DatalogpmParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `DatalogpmParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class DatalogpmVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `DatalogpmParser.program`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgram?: (ctx: ProgramContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClause?: (ctx: ClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.comment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComment?: (ctx: CommentContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.fact`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFact?: (ctx: FactContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.annotationBody`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnnotationBody?: (ctx: AnnotationBodyContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.annotation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnnotation?: (ctx: AnnotationContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.temporalAnnotation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalAnnotation?: (ctx: TemporalAnnotationContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.rrule`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRrule?: (ctx: RruleContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.head`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHead?: (ctx: HeadContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.falseHead`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFalseHead?: (ctx: FalseHeadContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.egdHead`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEgdHead?: (ctx: EgdHeadContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.body`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBody?: (ctx: BodyContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLiteral?: (ctx: LiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `PosLiteral`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPosLiteral?: (ctx: PosLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `NegLiteral`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNegLiteral?: (ctx: NegLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `domStar`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDomStar?: (ctx: DomStarContext) => Result;
	/**
	 * Visit a parse tree produced by the `diamondMinusLiteral`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiamondMinusLiteral?: (ctx: DiamondMinusLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `diamondPlusLiteral`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiamondPlusLiteral?: (ctx: DiamondPlusLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `boxMinusLiteral`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBoxMinusLiteral?: (ctx: BoxMinusLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `boxPlusLiteral`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBoxPlusLiteral?: (ctx: BoxPlusLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `triangleUpLiteral`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTriangleUpLiteral?: (ctx: TriangleUpLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `triangleDownLiteral`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTriangleDownLiteral?: (ctx: TriangleDownLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `closeIntervalLiteral`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCloseIntervalLiteral?: (ctx: CloseIntervalLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `selectIntervalLiteral`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelectIntervalLiteral?: (ctx: SelectIntervalLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `sinceLiteral`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSinceLiteral?: (ctx: SinceLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `untilLiteral`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUntilLiteral?: (ctx: UntilLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.condition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCondition?: (ctx: ConditionContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.gtCondition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGtCondition?: (ctx: GtConditionContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.ltCondition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLtCondition?: (ctx: LtConditionContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.geCondition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGeCondition?: (ctx: GeConditionContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.leCondition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLeCondition?: (ctx: LeConditionContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.eqCondition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEqCondition?: (ctx: EqConditionContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.neqCondition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNeqCondition?: (ctx: NeqConditionContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.inCondition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInCondition?: (ctx: InConditionContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.notInCondition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNotInCondition?: (ctx: NotInConditionContext) => Result;
	/**
	 * Visit a parse tree produced by the `ltExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLtExpression?: (ctx: LtExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `gtExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGtExpression?: (ctx: GtExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `externalExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExternalExpression?: (ctx: ExternalExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `intersectionExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntersectionExpression?: (ctx: IntersectionExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `minusExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMinusExpression?: (ctx: MinusExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `skolemExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSkolemExpression?: (ctx: SkolemExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `prodExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProdExpression?: (ctx: ProdExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `leExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLeExpression?: (ctx: LeExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `eqEqExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEqEqExpression?: (ctx: EqEqExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `notExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNotExpression?: (ctx: NotExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `divExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDivExpression?: (ctx: DivExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `precExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrecExpression?: (ctx: PrecExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `unionExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnionExpression?: (ctx: UnionExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `stringOperatorsExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringOperatorsExpression?: (ctx: StringOperatorsExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `orExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOrExpression?: (ctx: OrExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `unaryMinusExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnaryMinusExpression?: (ctx: UnaryMinusExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `neqExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNeqExpression?: (ctx: NeqExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `andExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAndExpression?: (ctx: AndExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `aggrExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAggrExpression?: (ctx: AggrExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `geExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGeExpression?: (ctx: GeExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `plusExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPlusExpression?: (ctx: PlusExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `termExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTermExpression?: (ctx: TermExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `msumAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMsumAggExpression?: (ctx: MsumAggExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `mprodAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMprodAggExpression?: (ctx: MprodAggExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `mcountAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMcountAggExpression?: (ctx: McountAggExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `munionAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMunionAggExpression?: (ctx: MunionAggExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `mmaxAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMmaxAggExpression?: (ctx: MmaxAggExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `mminAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMminAggExpression?: (ctx: MminAggExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `unionAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnionAggExpression?: (ctx: UnionAggExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `listAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitListAggExpression?: (ctx: ListAggExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `setAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSetAggExpression?: (ctx: SetAggExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `minAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMinAggExpression?: (ctx: MinAggExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `maxAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMaxAggExpression?: (ctx: MaxAggExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `sumAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSumAggExpression?: (ctx: SumAggExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `prodAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProdAggExpression?: (ctx: ProdAggExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `avgAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAvgAggExpression?: (ctx: AvgAggExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `countAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCountAggExpression?: (ctx: CountAggExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `substringExpression`
	 * labeled alternative in `DatalogpmParser.stringOperators`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubstringExpression?: (ctx: SubstringExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `containsExpression`
	 * labeled alternative in `DatalogpmParser.stringOperators`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitContainsExpression?: (ctx: ContainsExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `startsWithExpression`
	 * labeled alternative in `DatalogpmParser.stringOperators`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStartsWithExpression?: (ctx: StartsWithExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `endsWithExpression`
	 * labeled alternative in `DatalogpmParser.stringOperators`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEndsWithExpression?: (ctx: EndsWithExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `concatExpression`
	 * labeled alternative in `DatalogpmParser.stringOperators`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConcatExpression?: (ctx: ConcatExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `stringLengthExpression`
	 * labeled alternative in `DatalogpmParser.stringOperators`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringLengthExpression?: (ctx: StringLengthExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `indexOfExpression`
	 * labeled alternative in `DatalogpmParser.stringOperators`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndexOfExpression?: (ctx: IndexOfExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.varList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVarList?: (ctx: VarListContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.annotationAtom`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnnotationAtom?: (ctx: AnnotationAtomContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.atomAnnotation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAtomAnnotation?: (ctx: AtomAnnotationContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.atom`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAtom?: (ctx: AtomContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.temporalInterval`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalInterval?: (ctx: TemporalIntervalContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.temporalRelativeIntervalNumber`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalRelativeIntervalNumber?: (ctx: TemporalRelativeIntervalNumberContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.temporalRelativeIntervalPeriod`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalRelativeIntervalPeriod?: (ctx: TemporalRelativeIntervalPeriodContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.temporalRelativeInterval`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalRelativeInterval?: (ctx: TemporalRelativeIntervalContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.temporalSelectInterval`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalSelectInterval?: (ctx: TemporalSelectIntervalContext) => Result;
	/**
	 * Visit a parse tree produced by the `temporalTermOpenStart`
	 * labeled alternative in `DatalogpmParser.temporalTermStart`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalTermOpenStart?: (ctx: TemporalTermOpenStartContext) => Result;
	/**
	 * Visit a parse tree produced by the `temporalTermCloseStart`
	 * labeled alternative in `DatalogpmParser.temporalTermStart`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalTermCloseStart?: (ctx: TemporalTermCloseStartContext) => Result;
	/**
	 * Visit a parse tree produced by the `temporalTermOpenEnd`
	 * labeled alternative in `DatalogpmParser.temporalTermEnd`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalTermOpenEnd?: (ctx: TemporalTermOpenEndContext) => Result;
	/**
	 * Visit a parse tree produced by the `temporalTermCloseEnd`
	 * labeled alternative in `DatalogpmParser.temporalTermEnd`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalTermCloseEnd?: (ctx: TemporalTermCloseEndContext) => Result;
	/**
	 * Visit a parse tree produced by the `temporalTermStartValueDate`
	 * labeled alternative in `DatalogpmParser.temporalTermStartValue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalTermStartValueDate?: (ctx: TemporalTermStartValueDateContext) => Result;
	/**
	 * Visit a parse tree produced by the `temporalTermStartValueNumber`
	 * labeled alternative in `DatalogpmParser.temporalTermStartValue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalTermStartValueNumber?: (ctx: TemporalTermStartValueNumberContext) => Result;
	/**
	 * Visit a parse tree produced by the `temporalTermStartValueInfty`
	 * labeled alternative in `DatalogpmParser.temporalTermStartValue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalTermStartValueInfty?: (ctx: TemporalTermStartValueInftyContext) => Result;
	/**
	 * Visit a parse tree produced by the `temporalTermEndValueDate`
	 * labeled alternative in `DatalogpmParser.temporalTermEndValue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalTermEndValueDate?: (ctx: TemporalTermEndValueDateContext) => Result;
	/**
	 * Visit a parse tree produced by the `temporalTermEndValueNumber`
	 * labeled alternative in `DatalogpmParser.temporalTermEndValue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalTermEndValueNumber?: (ctx: TemporalTermEndValueNumberContext) => Result;
	/**
	 * Visit a parse tree produced by the `temporalTermEndValueInfty`
	 * labeled alternative in `DatalogpmParser.temporalTermEndValue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalTermEndValueInfty?: (ctx: TemporalTermEndValueInftyContext) => Result;
	/**
	 * Visit a parse tree produced by the `temporalSelectTermOpenStart`
	 * labeled alternative in `DatalogpmParser.temporalSelectTermStart`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalSelectTermOpenStart?: (ctx: TemporalSelectTermOpenStartContext) => Result;
	/**
	 * Visit a parse tree produced by the `temporalSelectTermCloseStart`
	 * labeled alternative in `DatalogpmParser.temporalSelectTermStart`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalSelectTermCloseStart?: (ctx: TemporalSelectTermCloseStartContext) => Result;
	/**
	 * Visit a parse tree produced by the `temporalSelectTermOpenEnd`
	 * labeled alternative in `DatalogpmParser.temporalSelectTermEnd`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalSelectTermOpenEnd?: (ctx: TemporalSelectTermOpenEndContext) => Result;
	/**
	 * Visit a parse tree produced by the `temporalSelectTermCloseEnd`
	 * labeled alternative in `DatalogpmParser.temporalSelectTermEnd`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalSelectTermCloseEnd?: (ctx: TemporalSelectTermCloseEndContext) => Result;
	/**
	 * Visit a parse tree produced by the `temporalSelectTermStartValueDate`
	 * labeled alternative in `DatalogpmParser.temporalSelectTermStartValue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalSelectTermStartValueDate?: (ctx: TemporalSelectTermStartValueDateContext) => Result;
	/**
	 * Visit a parse tree produced by the `temporalSelectTermStartValueNumber`
	 * labeled alternative in `DatalogpmParser.temporalSelectTermStartValue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalSelectTermStartValueNumber?: (ctx: TemporalSelectTermStartValueNumberContext) => Result;
	/**
	 * Visit a parse tree produced by the `temporalSelectTermStartValueInfty`
	 * labeled alternative in `DatalogpmParser.temporalSelectTermStartValue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalSelectTermStartValueInfty?: (ctx: TemporalSelectTermStartValueInftyContext) => Result;
	/**
	 * Visit a parse tree produced by the `temporalSelectTermEndValueDate`
	 * labeled alternative in `DatalogpmParser.temporalSelectTermEndValue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalSelectTermEndValueDate?: (ctx: TemporalSelectTermEndValueDateContext) => Result;
	/**
	 * Visit a parse tree produced by the `temporalSelectTermEndValueNumber`
	 * labeled alternative in `DatalogpmParser.temporalSelectTermEndValue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalSelectTermEndValueNumber?: (ctx: TemporalSelectTermEndValueNumberContext) => Result;
	/**
	 * Visit a parse tree produced by the `temporalSelectTermEndValueInfty`
	 * labeled alternative in `DatalogpmParser.temporalSelectTermEndValue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalSelectTermEndValueInfty?: (ctx: TemporalSelectTermEndValueInftyContext) => Result;
	/**
	 * Visit a parse tree produced by the `temporalRelativeTermOpenStart`
	 * labeled alternative in `DatalogpmParser.temporalRelativeTermStart`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalRelativeTermOpenStart?: (ctx: TemporalRelativeTermOpenStartContext) => Result;
	/**
	 * Visit a parse tree produced by the `temporalRelativeTermCloseStart`
	 * labeled alternative in `DatalogpmParser.temporalRelativeTermStart`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalRelativeTermCloseStart?: (ctx: TemporalRelativeTermCloseStartContext) => Result;
	/**
	 * Visit a parse tree produced by the `temporalRelativeTermOpenEnd`
	 * labeled alternative in `DatalogpmParser.temporalRelativeTermEnd`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalRelativeTermOpenEnd?: (ctx: TemporalRelativeTermOpenEndContext) => Result;
	/**
	 * Visit a parse tree produced by the `temporalRelativeTermCloseEnd`
	 * labeled alternative in `DatalogpmParser.temporalRelativeTermEnd`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalRelativeTermCloseEnd?: (ctx: TemporalRelativeTermCloseEndContext) => Result;
	/**
	 * Visit a parse tree produced by the `temporalRelativeTermStartValueNumber`
	 * labeled alternative in `DatalogpmParser.temporalRelativeTermStartValue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalRelativeTermStartValueNumber?: (ctx: TemporalRelativeTermStartValueNumberContext) => Result;
	/**
	 * Visit a parse tree produced by the `temporalRelativeTermStartValueDate`
	 * labeled alternative in `DatalogpmParser.temporalRelativeTermStartDate`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalRelativeTermStartValueDate?: (ctx: TemporalRelativeTermStartValueDateContext) => Result;
	/**
	 * Visit a parse tree produced by the `temporalRelativeTermEndValueNumber`
	 * labeled alternative in `DatalogpmParser.temporalRelativeTermEndValue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalRelativeTermEndValueNumber?: (ctx: TemporalRelativeTermEndValueNumberContext) => Result;
	/**
	 * Visit a parse tree produced by the `temporalRelativeTermEndValueInfty`
	 * labeled alternative in `DatalogpmParser.temporalRelativeTermEndValue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalRelativeTermEndValueInfty?: (ctx: TemporalRelativeTermEndValueInftyContext) => Result;
	/**
	 * Visit a parse tree produced by the `temporalRelativeTermEndValueDate`
	 * labeled alternative in `DatalogpmParser.temporalRelativeTermEndDate`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalRelativeTermEndValueDate?: (ctx: TemporalRelativeTermEndValueDateContext) => Result;
	/**
	 * Visit a parse tree produced by the `temporalRelativeTermEndValueInftyDate`
	 * labeled alternative in `DatalogpmParser.temporalRelativeTermEndDate`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalRelativeTermEndValueInftyDate?: (ctx: TemporalRelativeTermEndValueInftyDateContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.temporalTermDate`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalTermDate?: (ctx: TemporalTermDateContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.temporalTermNumber`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalTermNumber?: (ctx: TemporalTermNumberContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.temporalTermInfty`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalTermInfty?: (ctx: TemporalTermInftyContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.diamondMinusOperator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiamondMinusOperator?: (ctx: DiamondMinusOperatorContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.boxMinusOperator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBoxMinusOperator?: (ctx: BoxMinusOperatorContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.diamondPlusOperator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiamondPlusOperator?: (ctx: DiamondPlusOperatorContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.boxPlusOperator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBoxPlusOperator?: (ctx: BoxPlusOperatorContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.sinceOperator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSinceOperator?: (ctx: SinceOperatorContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.untilOperator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUntilOperator?: (ctx: UntilOperatorContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.triangleUpOperator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTriangleUpOperator?: (ctx: TriangleUpOperatorContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.triangleDownOperator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTriangleDownOperator?: (ctx: TriangleDownOperatorContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.closeIntervalOperator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCloseIntervalOperator?: (ctx: CloseIntervalOperatorContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.selectIntervalOperator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelectIntervalOperator?: (ctx: SelectIntervalOperatorContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.diamondPlusSymbol`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiamondPlusSymbol?: (ctx: DiamondPlusSymbolContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.diamondMinusSymbol`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiamondMinusSymbol?: (ctx: DiamondMinusSymbolContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.sinceSymbol`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSinceSymbol?: (ctx: SinceSymbolContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.untilSymbol`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUntilSymbol?: (ctx: UntilSymbolContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.boxMinusSymbol`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBoxMinusSymbol?: (ctx: BoxMinusSymbolContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.boxPlusSymbol`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBoxPlusSymbol?: (ctx: BoxPlusSymbolContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.triangleUpSymbol`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTriangleUpSymbol?: (ctx: TriangleUpSymbolContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.triangleDownSymbol`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTriangleDownSymbol?: (ctx: TriangleDownSymbolContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.closeIntervalSymbol`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCloseIntervalSymbol?: (ctx: CloseIntervalSymbolContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.selectIntervalSymbol`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelectIntervalSymbol?: (ctx: SelectIntervalSymbolContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.timeGroupInfo`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTimeGroupInfo?: (ctx: TimeGroupInfoContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.timeGroupInfoInteger`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTimeGroupInfoInteger?: (ctx: TimeGroupInfoIntegerContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.timeGroupInfoDouble`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTimeGroupInfoDouble?: (ctx: TimeGroupInfoDoubleContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.timeUnit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTimeUnit?: (ctx: TimeUnitContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.term`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTerm?: (ctx: TermContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.stringConstTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringConstTerm?: (ctx: StringConstTermContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.integerConstTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntegerConstTerm?: (ctx: IntegerConstTermContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.doubleConstTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDoubleConstTerm?: (ctx: DoubleConstTermContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.booleanConstTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBooleanConstTerm?: (ctx: BooleanConstTermContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.dateConstTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDateConstTerm?: (ctx: DateConstTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `list`
	 * labeled alternative in `DatalogpmParser.listTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList?: (ctx: ListContext) => Result;
	/**
	 * Visit a parse tree produced by the `emptySet`
	 * labeled alternative in `DatalogpmParser.setConstTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEmptySet?: (ctx: EmptySetContext) => Result;
	/**
	 * Visit a parse tree produced by the `stringSet`
	 * labeled alternative in `DatalogpmParser.setConstTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringSet?: (ctx: StringSetContext) => Result;
	/**
	 * Visit a parse tree produced by the `integerSet`
	 * labeled alternative in `DatalogpmParser.setConstTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntegerSet?: (ctx: IntegerSetContext) => Result;
	/**
	 * Visit a parse tree produced by the `doubleSet`
	 * labeled alternative in `DatalogpmParser.setConstTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDoubleSet?: (ctx: DoubleSetContext) => Result;
	/**
	 * Visit a parse tree produced by the `dateSet`
	 * labeled alternative in `DatalogpmParser.setConstTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDateSet?: (ctx: DateSetContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.varTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVarTerm?: (ctx: VarTermContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.anonTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnonTerm?: (ctx: AnonTermContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.paramTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParamTerm?: (ctx: ParamTermContext) => Result;
	/**
	 * Visit a parse tree produced by `DatalogpmParser.falseTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFalseTerm?: (ctx: FalseTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `iso8601DurationDefault`
	 * labeled alternative in `DatalogpmParser.iso8601Duration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIso8601DurationDefault?: (ctx: Iso8601DurationDefaultContext) => Result;
	/**
	 * Visit a parse tree produced by the `iso8601DurationWeek`
	 * labeled alternative in `DatalogpmParser.iso8601Duration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIso8601DurationWeek?: (ctx: Iso8601DurationWeekContext) => Result;
}
